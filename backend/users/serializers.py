from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAccountSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = [
            'id', 'username', 'email', 'photo',
            'first_name', 'last_name', 'gender', 'location',
            'birthday', 'summary'
        ]
