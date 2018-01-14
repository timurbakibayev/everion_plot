from django.shortcuts import render

# Create your views here.
def plotter(request):
    return render(request, 'plot.html', {})