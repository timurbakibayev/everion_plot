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
        for_output = []
        #print("Request",request.GET["date_from"])
        if "date_from" not in request.GET or \
            "date_to" not in request.GET or \
            "time_from" not in request.GET or \
            "time_to" not in request.GET:
            readings = Reading.objects.filter(patient_id=id).order_by('time_iso')
        else:
            filter_from = request.GET["date_from"] + "T" + request.GET["time_from"]
            filter_to = request.GET["date_to"] + "T" + request.GET["time_to"]
            readings = Reading.objects.filter(patient_id=id). \
                filter(time_iso__gte=filter_from). \
                filter(time_iso__lte=filter_to).order_by('time_iso')
        skip = len(readings) // 100
        i = 0
        sum_steps = 0
        sum_activity = 0
        for reading in readings:
            i += 1
            if skip == 0 or i % skip == 0:
                reading.value_steps += sum_steps
                reading.value_activity += sum_activity
                for_output.append(reading)
                sum_steps = 0
                sum_activity = 0
            else:
                sum_steps += reading.value_steps
                sum_activity += reading.value_activity

        serializer = ReadingSerializer(for_output, many=True, context={"request": request})
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ReadingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
