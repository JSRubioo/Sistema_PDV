from rest_framework import viewsets
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# Um ViewSet combina a lógica para várias rotas relacionadas (listar, criar, etc.) em uma única classe.
class ProductViewSet(viewsets.ModelViewSet):
    """
    Endpoint da API que permite que produtos sejam vistos ou editados.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    """
    Endpoint da API que permite que categorias sejam vistas ou editadas.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
