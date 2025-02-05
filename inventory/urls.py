from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Initialize the router
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'suppliers', views.SupplierViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'inventory-transactions', views.InventoryTransactionViewSet)

urlpatterns = [
    path('dashboard/', views.dashboard_view, name='dashboard'),
    
    # API URLs
    path('api/', include(router.urls)),  # Automatically includes all ViewSets under /api/
]
