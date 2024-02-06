from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView
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


class CommentListCreateAPIView(ListCreateAPIView):
    queryset = Comment.objects.order_by('created_at')
    serializer_class = CommentSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        problem_id = request.query_params.get('problem')
        parent_id = request.query_params.get('parent')

        problem = get_object_or_404(Problem, id=problem_id)
        if problem:
            queryset = queryset.filter(problem=problem)

        if parent_id:
            parent = get_object_or_404(Comment, id=parent_id)
            queryset = queryset.filter(parent=parent)
        else:
            queryset = queryset.filter(parent=None)

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
        serializer = CommentSerializer(comment).data

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

    problems_count = queryset.count()
    random_index = random.randint(1, problems_count)
    problem = Problem.objects.get(id=random_index)

    return Response(ProblemSerializer(problem, context={'request': request}).data)


class ProblemRetrieveAPIView(RetrieveAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    lookup_field = 'pk'


class ProblemListAPIView(ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['title']
    ordering_fields = ['difficulty', 'created_at']

    def get_queryset(self):
        queryset = Problem.objects.all()

        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__name=category)

        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)

        return queryset
