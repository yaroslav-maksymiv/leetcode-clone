from django.contrib import admin

from .models import (
    Problem, ProblemCategory, Submission, Comment, UserProblemStatus,
    UserCode, UserSavedProblems, ProgrammingLanguage
)


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    fields = ['problem_id', 'title', 'difficulty', 'category']
    list_filter = ('difficulty', 'category')
    list_display = ['id', 'problem_id', 'title', 'difficulty', 'number_of_likes', 'number_of_dislikes']
    list_display_links = ['id', 'problem_id', 'title']
    search_fields = ('title', 'category__name')

    def number_of_likes(self, obj):
        return obj.likes.count()

    def number_of_dislikes(self, obj):
        return obj.dislikes.count()


@admin.register(ProblemCategory)
class ProblemCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['id', 'name']
    fields = ['name']


@admin.register(ProgrammingLanguage)
class ProgrammingLanguageAdmin(admin.ModelAdmin):
    pass


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(UserCode)
class UserCodeAdmin(admin.ModelAdmin):
    pass


@admin.register(UserSavedProblems)
class UserSavedProblemsAdmin(admin.ModelAdmin):
    pass


@admin.register(UserProblemStatus)
class UserProblemStatusAdmin(admin.ModelAdmin):
    pass
