from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from virtualclas.permissions import IsOwnerOrReadOnly

class ProfileList(APIView):
    """
    List all profiles
    No Create view (post method), as profile creation handled by django signals
    """
    
    def get(self, request):
        """
        Retrieve a list of all profiles.

        Args:
            request (HttpRequest): The request object.

        Returns:
            Response: A serialized list of profiles.
        """
        
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(
            profiles, many=True, context={'request': request}
        )
        return Response(serializer.data)


class ProfileDetail(APIView):
    """
    Retrieve, update, or delete a profile.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, pk):
        """
        Get a profile object by its primary key and check permissions.

        Args:
            pk (int): The primary key of the profile.

        Returns:
            Profile: The profile object.

        Raises:
            Http404: If the profile does not exist.
        """
        try:
            profile = Profile.objects.get(pk=pk)
            self.check_object_permissions(self.request, profile)
            return profile
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Retrieve a profile by its primary key.

        Args:
            request (HttpRequest): The request object.
            pk (int): The primary key of the profile to retrieve.

        Returns:
            Response: A serialized profile object.
        """
        profile = self.get_object(pk)
        serializer = ProfileSerializer(
            profile, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update a profile by its primary key.

        Args:
            request (HttpRequest): The request object.
            pk (int): The primary key of the profile to update.

        Returns:
            Response: A serialized profile object if the update is successful,
                      or error details if the request is invalid.
        """
        profile = self.get_object(pk)
        serializer = ProfileSerializer(
            profile, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)