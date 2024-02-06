from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProblemListAPIView,
    ProgrammingLanguageListAPIView,
    CommentListCreateAPIView,
    ProblemRetrieveAPIView,
    get_random_problem,
    set_user_problem_status,
)
from .viewsets import (
    UserSavedProblemsViewSet,
    UserCodeViewSet,
    SubmissionViewSet,
)

urlpatterns = [
    path('problem/<int:pk>/', ProblemRetrieveAPIView.as_view(), name='problem-single'),
    path('problems/', ProblemListAPIView.as_view(), name='problems-list'),
    path('problem-random/', get_random_problem, name='random-problem'),
    path('set-problem-status/<int:pk>/', set_user_problem_status, name='set-problem-status'),
    path('languages/', ProgrammingLanguageListAPIView.as_view(), name='languages-list'),
    path('comments/', CommentListCreateAPIView.as_view(), name='comments'),
]

router = DefaultRouter()
router.register(r'problems-saved', UserSavedProblemsViewSet, basename='problems-saved')
router.register(r'my-code', UserCodeViewSet, basename='my-code')
router.register(r'submissions', SubmissionViewSet, basename='submissions')

urlpatterns += router.urls
