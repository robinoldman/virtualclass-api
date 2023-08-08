from rest_framework import serializers 
from assignments.models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    
    

    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Assignment
        fields = ['id', 'owner', 'created_at', 'updated_at', 'title', 
        'description', 'due_date', 'attachments']

