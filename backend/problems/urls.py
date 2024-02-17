from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProblemListAPIView,
    ProgrammingLanguageListAPIView,
    CommentListCreateAPIView,
    CommentDestroyAPIView,
    ProblemRetrieveAPIView,
    get_random_problem,
    get_user_problem_status,
    toggle_like_problem,
    toggle_dislike_problem,
    toggle_like_comment,
    toggle_dislike_comment
)
from .viewsets import (
    UserSavedProblemsViewSet,
    UserCodeViewSet,
    SubmissionViewSet,
)

urlpatterns = [
    path('problems/', ProblemListAPIView.as_view(), name='problems-list'),
    path('problems/<str:problem_id>/', ProblemRetrieveAPIView.as_view(), name='problem-single'),
    path('problems/<int:pk>/status/', get_user_problem_status, name='problem-status'),
    path('problems/<int:pk>/like/', toggle_like_problem, name='like-problem'),
    path('problems/<int:pk>/dislike/', toggle_dislike_problem, name='dislike-problem'),
    path('problem-random/', get_random_problem, name='random-problem'),

    path('languages/', ProgrammingLanguageListAPIView.as_view(), name='languages-list'),

    path('comments/', CommentListCreateAPIView.as_view(), name='comments'),
    path('comments/<int:pk>/', CommentDestroyAPIView.as_view(), name='comment-delete'),
    path('comments/<int:pk>/like/', toggle_like_comment, name='comment-like'),
    path('comments/<int:pk>/dislike/', toggle_dislike_comment, name='comment-dislike'),
]

router = DefaultRouter()
router.register(r'problems-saved', UserSavedProblemsViewSet, basename='problems-saved')
router.register(r'my-code', UserCodeViewSet, basename='my-code')
router.register(r'submissions', SubmissionViewSet, basename='submissions')

urlpatterns += router.urls
