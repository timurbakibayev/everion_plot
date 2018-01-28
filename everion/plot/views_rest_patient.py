from django.contrib.auth.models import User
from django.utils.datetime_safe import datetime
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.mail import send_mail
from everion import settings
from django.db.models import Q

from plot.serializers import PatientSerializer
from plot.models import Patient


@api_view(['GET', 'POST'])
@method_decorator(csrf_exempt, name='dispatch')
def patient_list(request):
    user = request.user
    #if user is None:
    #    return Response({"detail": "Необходима авторизация"})

    if request.method == 'GET':
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True, context={"request": request})
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@method_decorator(csrf_exempt, name='dispatch')
def patient_details(request, id):
    user = request.user
    if user is None:
        return Response({"detail": "Необходима авторизация"})
    try:
        patient = Patient.objects.get(pk=id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)