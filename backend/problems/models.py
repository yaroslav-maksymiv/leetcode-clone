from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class TimestampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ProblemCategory(TimestampModel):
    class Meta:
        verbose_name_plural = 'Categories'

    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Problem(TimestampModel):
    class Meta:
        ordering = ['created_at']

    DIFFICULTY_CHOICES = (
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    )

    problem_id = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    category = models.ManyToManyField(ProblemCategory, related_name='problems')
    likes = models.ManyToManyField(User, related_name='problem_like')
    dislikes = models.ManyToManyField(User, related_name='problem_dislike')

    def number_of_comments(self):
        return self.comments.filter(parent=None).count()

    def number_of_likes(self):
        return self.likes.count()

    def number_of_dislikes(self):
        return self.dislikes.count()

    def acceptance_rate(self):
        total_submissions = self.submissions.count()
        if total_submissions == 0:
            return 0.0
        accepted_submissions = self.submissions.filter(is_accepted=True).count()
        return (accepted_submissions / total_submissions) * 100

    def get_difficulty_display(self, value):
        display_value = None
        for choice in self.DIFFICULTY_CHOICES:
            if choice[0] == value:
                display_value = choice[1]
                break
        return display_value

    def __str__(self):
        return self.title


class ProgrammingLanguage(TimestampModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Submission(TimestampModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='submissions')
    is_accepted = models.BooleanField()
    language = models.ForeignKey(ProgrammingLanguage, on_delete=models.CASCADE)
    runtime_ms = models.FloatField(blank=True, null=True)
    memory_kb = models.FloatField(blank=True, null=True)


class UserProblemStatus(TimestampModel):
    STATUS_CHOICES = (
        ('attempted', 'Attempted'),
        ('solved', 'Solved'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='statuses')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('user', 'problem')


class UserSavedProblems(TimestampModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    saved_problems = models.ManyToManyField(Problem)

    def number_of_saved(self):
        return self.saved_problems.count()


class UserCode(TimestampModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    language = models.ForeignKey(ProgrammingLanguage, on_delete=models.CASCADE)
    code = models.TextField()

    def __str__(self):
        return f'{self.user.username}\'s code for {self.problem.title} in {self.language}'


class Comment(TimestampModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    content = models.TextField()
    likes = models.ManyToManyField(User, blank=True, related_name='comment_likes')
    dislikes = models.ManyToManyField(User, blank=True, related_name='comment_dislikes')

    def __str__(self):
        return f'{self.user.username}\'s comment on {self.problem.title}'

