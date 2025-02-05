import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import Category, Supplier, Item, InventoryTransaction
from .serializers import CategorySerializer, SupplierSerializer, ItemSerializer, InventoryTransactionSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


def dashboard_view(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:

        categories = Category.objects.all()
        suppliers = Supplier.objects.all()
        items = Item.objects.all()
        
        context = {
            'categories': categories,
            'suppliers': suppliers,
            'items': items
        }
        return render(request, 'inventory/dashboard.html', context)

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))
    

def add_item_view(request):
    categories = Category.objects.all()
    suppliers = Supplier.objects.all()

    if request.method == 'POST':
        # Handle form submission here (we'll cover this in step 3)
        pass

    return render(request, 'inventory/dasboard.html', {
        'categories': categories,
        'suppliers': suppliers,
    })



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users can access

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = []

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = []

class InventoryTransactionViewSet(viewsets.ModelViewSet):
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer
    permission_classes = [IsAuthenticated]