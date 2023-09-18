from django.contrib.auth.models import User
from rest_framework import serializers
from lessons.models import Lessons

class LessonsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context.get('request')
        if request and request.user:
            return obj.owner == request.user
        return False

    class Meta:
        model = Lessons
        fields = '__all__'

