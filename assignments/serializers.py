from django.contrib.auth.models import User
from rest_framework import serializers 
from assignments.models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    
    

    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
        if request and request.user:
            return obj.owner == request.user
        return False

    class Meta:
        model = Assignment
        fields = '__all__' 

