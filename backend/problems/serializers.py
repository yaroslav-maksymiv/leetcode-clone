from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import (
    Problem, ProblemCategory, Submission, Comment, UserProblemStatus,
    UserCode, UserSavedProblems, ProgrammingLanguage
)
from users.serializers import UserBaseSerializer


class ProgrammingLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammingLanguage
        fields = ['id', 'name']


class UserProblemStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProblemStatus
        fields = ['user', 'problem', 'status']


class ProblemCategorySerializer(ModelSerializer):
    class Meta:
        model = ProblemCategory
        fields = ['id', 'name']


class ProblemSerializer(ModelSerializer):
    category = ProblemCategorySerializer(many=True, read_only=True)
    user_status = serializers.SerializerMethodField(read_only=True)
    saved = serializers.SerializerMethodField(read_only=True)
    user_liked = serializers.SerializerMethodField(read_only=True)
    user_disliked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Problem
        fields = ['id', 'problem_id', 'title', 'category',
                  'user_status', 'user_liked', 'user_disliked', 'saved']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['comments_count'] = instance.number_of_comments()
        representation['difficulty'] = instance.get_difficulty_display(instance.difficulty)
        representation['likes'] = instance.number_of_likes()
        representation['dislikes'] = instance.number_of_dislikes()
        representation['acceptance'] = instance.acceptance_rate()
        representation['submissions_count'] = instance.submissions.count()
        representation['accepted_submissions_count'] = instance.submissions.filter(is_accepted=True).count()

        return representation

    def get_user_status(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            try:
                user_status = UserProblemStatus.objects.get(user=user, problem=obj)
                return user_status.status
            except UserProblemStatus.DoesNotExist:
                return None
        return None

    def get_saved(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            is_saved = UserSavedProblems.objects.filter(user=user, saved_problems__id=obj.id).exists()
            return is_saved
        return False

    def get_user_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            if user in obj.likes.all():
                return True
            return False
        return None

    def get_user_disliked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            if user in obj.dislikes.all():
                return True
            return False
        return None


class UserSavedProblemsSerializer(serializers.ModelSerializer):
    saved_problems = ProblemSerializer(many=True, read_only=True)

    class Meta:
        model = UserSavedProblems
        fields = ['saved_problems']


class UserCodeSerializer(serializers.ModelSerializer):
    language = ProgrammingLanguageSerializer(read_only=True)

    class Meta:
        model = UserCode
        fields = ['problem', 'language', 'code']


class SubmissionSerializer(serializers.ModelSerializer):
    language = ProgrammingLanguageSerializer()

    class Meta:
        model = Submission
        fields = ['user', 'problem', 'is_accepted', 'language', 'runtime_ms', 'memory_kb', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    user = UserBaseSerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    dislikes = serializers.SerializerMethodField(read_only=True)
    replies_count = serializers.SerializerMethodField(read_only=True)
    user_liked = serializers.SerializerMethodField(read_only=True)
    user_disliked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'problem', 'parent', 'content',
                  'likes', 'dislikes', 'created_at', 'updated_at',
                  'replies_count', 'user_liked', 'user_disliked']

    def get_user_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            if user in obj.likes.all():
                return True
        return False

    def get_user_disliked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            if user in obj.dislikes.all():
                return True
        return False

    def get_replies_count(self, obj):
        if obj.replies.exists():
            return obj.replies.count()
        return 0

    def get_likes(self, obj):
        return obj.likes.count()

    def get_dislikes(self, obj):
        return obj.dislikes.count()
