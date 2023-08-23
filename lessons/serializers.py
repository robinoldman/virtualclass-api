from rest_framework import serializers 
from lessons.models import Lessons


class LessonsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    
    

    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Lessons
        fields = ['id', 'owner', 'is_owner', 
        'profile_image', 'post', 
        'created_at', 'updated_at', 'content'] 

