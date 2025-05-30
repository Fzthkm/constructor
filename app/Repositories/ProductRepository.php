<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductImage;

class ProductRepository
{
    protected Product $productModel;
    protected ProductImage $productImageModel;

    public function __construct()
    {
        $this->productModel = new Product();
        $this->productImageModel = new ProductImage();
    }

    public function getProductsByCategory($categoryId)
    {
        return $this->productModel
            ->join('products_categories', 'products_categories.sku = products.sku')
            ->where('products_categories.id_category', $categoryId)
            ->where('products.price', '!=', '0.00')
            ->select('products.sku')
            ->select('products.price')
            ->select('products.name')
            ->select('products.discount_price')
            ->findAll();
    }

    public function getProductBySku($sku)
    {
        $product = $this->productModel
            ->select('products.sku')
            ->select('products.price')
            ->select('products.name')
            ->select('products.discount_price')
            ->select('products_categories.id_category')
            ->join('products_categories', 'products_categories.sku = products.sku')
            ->where('products.sku', $sku)
            ->first();

        if (!$product) {
            return null;
        }

        $product['image'] = $this->getProductImage($sku);

        return $product;
    }


    public function getProductsImage(array $productsSkus): array
    {
        return $this->productImageModel
            ->select(['image', 'sku'])
            ->whereIn('sku', $productsSkus)
            ->where('main', 1)
            ->get()
            ->getResultArray();
    }

    public function getProductsBySkus(array $skus): array
    {
        return $this->productModel
            ->select([
                'products.sku',
                'products.name',
                'products.price',
                'products.discount_price'
            ])
            ->whereIn('sku', $skus)
            ->findAll();
    }
}