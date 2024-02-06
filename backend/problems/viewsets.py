from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (
    Submission, UserCode, UserSavedProblems,
    Problem, ProgrammingLanguage
)
from .serializers import (
    UserSavedProblemsSerializer,
    UserCodeSerializer, SubmissionSerializer
)


class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        problem_id = request.data.get('problem')
        problem = get_object_or_404(Problem, id=problem_id)
        submissions = Submission.objects.filter(user=user, problem=problem)
        serializer = self.get_serializer(submissions, many=True)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        problem_id = request.data.get('problem')
        language_id = request.data.get('language')
        is_accepted = bool(request.data.get('accepted'))
        runtime = request.data.get('runtime')
        memory = request.data.get('memory')

        problem = get_object_or_404(Problem, id=problem_id)
        language = get_object_or_404(ProgrammingLanguage, id=language_id)

        submission = Submission(
            user=user,
            problem=problem,
            is_accepted=is_accepted,
            language=language,
            runtime_ms=runtime,
            memory_kb=memory,
        )

        submission.save()

        return Response(SubmissionSerializer(submission).data, status=status.HTTP_201_CREATED)


class UserCodeViewSet(viewsets.ModelViewSet):
    serializer_class = UserCodeSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        user = request.user
        problem_id = request.data.get('problem')
        language_id = request.data.get('language')
        code = request.data.get('code')

        problem = get_object_or_404(Problem, id=problem_id)
        language = get_object_or_404(ProgrammingLanguage, id=language_id)

        user_code, created = UserCode.objects.get_or_create(
            user=user,
            problem=problem,
            language=language,
            defaults={'code': code}
        )

        user_code_data = {
            'user': user.id,
            'problem': problem.id,
            'language': language.id,
            'code': code
        }

        serializer = self.get_serializer(user_code, data=user_code_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        user = request.user
        problem = get_object_or_404(Problem, id=pk)
        language_id = request.data.get('language')
        language = get_object_or_404(ProgrammingLanguage, id=language_id)
        code = get_object_or_404(UserCode, user=user, problem=problem, language=language)
        serializer = self.get_serializer(code)
        return Response(serializer.data)


class UserSavedProblemsViewSet(viewsets.ModelViewSet):
    serializer_class = UserSavedProblemsSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        problems_instance, created = UserSavedProblems.objects.get_or_create(user=user)
        serializer = self.get_serializer(problems_instance)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'], url_path='add')
    def add_to_saved_problems(self, request, pk):
        problem = get_object_or_404(Problem, id=pk)
        saved_problems_instance, created = UserSavedProblems.objects.get_or_create(user=request.user)
        saved_problems_instance.saved_problems.add(problem)
        saved_problems_instance.save()
        serializer = self.get_serializer(saved_problems_instance)
        return Response(serializer.data)

    @action(detail=True, methods=['DELETE'], url_path='delete')
    def remove_from_saved_problems(self, request, pk):
        problem = get_object_or_404(Problem, id=pk)
        saved_problems_instance = get_object_or_404(UserSavedProblems, user=request.user)
        saved_problems_instance.saved_problems.remove(problem)
        saved_problems_instance.save()
        serializer = self.get_serializer(saved_problems_instance)
        return Response(serializer.data)
