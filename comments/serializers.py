from rest_framework import serializers 
from comments.models import Comment 


class CommentsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    

    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Comment
        fields = ['id', 'owner', 'is_owner', 
        'profile_image', 'post', 
        'created_at', 'updated_at', 'content'] 

class CommentDetailSerializer(CommentsSerializer):
    
    post = serializers.ReadOnlyField(source='post.id')