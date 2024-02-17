from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework import filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import (
    Problem, UserProblemStatus,
    ProgrammingLanguage, Comment
)
from .serializers import (
    ProblemSerializer, UserProblemStatusSerializer,
    ProgrammingLanguageSerializer, CommentSerializer
)
from .pagination import CustomPagination

import random


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like_comment(request, pk):
    try:
        comment = Comment.objects.get(id=pk)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    response_data = {}

    if user in comment.likes.all():
        comment.likes.remove(user)
        response_data['message'] = 'Like removed'
    else:
        comment.likes.add(user)
        if user in comment.dislikes.all():
            comment.dislikes.remove(user)
        response_data['message'] = 'Comment liked'

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_dislike_comment(request, pk):
    try:
        comment = Comment.objects.get(id=pk)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    response_data = {}

    if user in comment.dislikes.all():
        comment.dislikes.remove(user)
        response_data['message'] = 'Dislike removed'
    else:
        comment.dislikes.add(user)
        if user in comment.likes.all():
            comment.likes.remove(user)
        response_data['message'] = 'Comment disliked'

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_problem_status(request, pk):
    problem = get_object_or_404(Problem, id=pk)
    user_status = UserProblemStatus.objects.get(user=request.user, problem=problem)
    return Response({'status': user_status.status})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like_problem(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    response_data = {}

    if user in problem.likes.all():
        problem.likes.remove(user)
        response_data['message'] = 'Like removed'
    else:
        problem.likes.add(user)
        if user in problem.dislikes.all():
            problem.dislikes.remove(user)
        response_data['message'] = 'Problem liked'

    response_data['likes'] = problem.likes.count()
    response_data['dislikes'] = problem.dislikes.count()

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_dislike_problem(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    response_data = {}

    if user in problem.dislikes.all():
        problem.dislikes.remove(user)
        response_data['message'] = 'Dislike removed'
    else:
        problem.dislikes.add(user)
        if user in problem.likes.all():
            problem.likes.remove(user)
        response_data['message'] = 'Problem disliked'

    response_data['likes'] = problem.likes.count()
    response_data['dislikes'] = problem.dislikes.count()

    return Response(response_data, status=status.HTTP_200_OK)


class CommentDestroyAPIView(DestroyAPIView):
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user != instance.user:
            return Response({'message': 'You have no permission to delete this comment.'},
                            status=status.HTTP_403_FORBIDDEN)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentListCreateAPIView(ListCreateAPIView):
    queryset = Comment.objects.order_by('created_at')
    serializer_class = CommentSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        problem_id = request.query_params.get('problem')
        parent_id = request.query_params.get('parent')
        order_by = request.query_params.get('order_by')

        if parent_id:
            parent = get_object_or_404(Comment, id=parent_id)
            queryset = queryset.filter(parent=parent)
        else:
            queryset = queryset.filter(parent=None)
            problem = get_object_or_404(Problem, id=problem_id)
            if problem:
                queryset = queryset.filter(problem=problem)

        queryset = queryset.order_by(order_by)
        queryset = self.filter_queryset(queryset)
        page = self.paginate_queryset(queryset)

        if page:
            serializer = self.get_serializer(page, many=True)
            result = self.get_paginated_response(serializer.data)
            data = result.data
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data

        return Response(data)

    def create(self, request, *args, **kwargs):
        user = request.user
        problem_id = request.data.get('problem')
        parent_id = request.data.get('parent')
        content = request.data.get('content')

        problem = get_object_or_404(Problem, id=problem_id)
        parent = None

        if parent_id:
            parent = get_object_or_404(Comment, id=parent_id)

        comment = Comment.objects.create(
            user=user,
            problem=problem,
            parent=parent,
            content=content
        )
        serializer = CommentSerializer(comment, context={'request': self.request}).data

        return Response(serializer)


class ProgrammingLanguageListAPIView(ListAPIView):
    queryset = ProgrammingLanguage.objects.all()
    serializer_class = ProgrammingLanguageSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_user_problem_status(request, pk):
    try:
        problem = Problem.objects.get(id=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

    user_problem_status, created = UserProblemStatus.objects.get_or_create(
        user=request.user,
        problem=problem,
        defaults={'status': request.data.get('status')}
    )

    status_data = {
        'user': request.user.id,
        'problem': problem.id,
        'status': request.data.get('status')
    }

    serializer = UserProblemStatusSerializer(user_problem_status, data=status_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_random_problem(request):
    queryset = Problem.objects.all()

    category = request.query_params.get('category')
    if category:
        queryset = queryset.filter(category__name=category)
    difficulty = request.query_params.get('difficulty')
    if difficulty:
        queryset = queryset.filter(difficulty=difficulty)

    if queryset.exists():
        random_problem = random.choice(queryset)
        serializer = ProblemSerializer(random_problem, context={'request': request})
        return Response(serializer.data)
    return Response({'error': 'No matching objects found'}, status=status.HTTP_404_NOT_FOUND)


class ProblemRetrieveAPIView(RetrieveAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    lookup_field = 'problem_id'

    def get_object(self):
        obj = self.queryset.get(problem_id=self.kwargs[self.lookup_field])
        return obj


class ProblemListAPIView(ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['title']
    ordering_fields = ['difficulty', 'created_at']

    def get_queryset(self):
        queryset = Problem.objects.all()

        user = self.request.user
        if user.is_authenticated:
            user_status = self.request.query_params.get('status')
            if user_status:
                queryset = queryset.filter(statuses__user=user, statuses__status=user_status)

        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__name=category)

        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)

        return queryset
