from django.shortcuts import render
from rest_framework import generics, permissions, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Assignment
from virtualclas.permissions import IsOwnerOrReadOnly
from rest_framework.generics import ListAPIView
from .serializers import AssignmentSerializer
from django.db.models import Count

class AssignmentList(generics.ListCreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Assignment.objects.annotate(

    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    search_fields = [
        'owner__username',
        'title',
        'course',
        'estimated_time',
        'due_date',
        'assigned_to',
        'estimated_time',
        'is_owner',
        'profile_id',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    def get_serializer_context(self):
        # Pass the request object to the serializer context
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class AssignmentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = AssignmentSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Get the queryset of lessons for the detail view.
        """
        return Assignment.objects.all()

        