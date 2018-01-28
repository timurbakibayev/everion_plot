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


from plot.serializers import ReadingSerializer
from plot.models import Reading


@api_view(['GET', 'POST'])
@method_decorator(csrf_exempt, name='dispatch')
def reading_list(request,id):
    user = request.user
    #if user is None:
    #    return Response({"detail": "Необходима авторизация"})

    if request.method == 'GET':
        readings = Reading.objects.filter(patient_id=id)
        serializer = ReadingSerializer(readings, many=True, context={"request": request})
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ReadingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
