from rest_framework import serializers
from .models import Category, Supplier, Item, InventoryTransaction


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'contact_name', 'phone', 'email', 'address']


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    supplier = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all())
    total_value = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    category_name = serializers.SerializerMethodField()
    supplier_name = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = [
            'id', 'name', 'category', 'category_name', 'supplier', 'supplier_name','quantity',
            'price_per_unit', 'total_value', 'date_added', 'last_updated'
        ]

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_supplier_name(self, obj):
        return obj.supplier.name if obj.supplier else None



class InventoryTransactionSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all())

    item_name = serializers.SerializerMethodField()

    class Meta:
        model = InventoryTransaction
        fields = [
            'id', 'item', 'transaction_type', 'item_name' , 'quantity', 'date', 'notes'
        ]

    def get_item_name(self, obj):
     return obj.item.name if obj.item else None