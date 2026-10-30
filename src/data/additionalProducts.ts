import type { ApiProduct, Product } from '../types/product'
import type { Category, DepartmentId } from '../types/catalog'
import { identifyProduct } from '../utils/products'

interface AdditionalSeed extends ApiProduct {
  department: DepartmentId
  category: Category
}

// Catálogo demonstrativo separado: não modifica a resposta da Econverse.
const catalog: AdditionalSeed[] = [
  {
    "productName": "Base de carregamento Apple AirPower",
    "descriptionShort": "Base de carregamento Apple AirPower. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-102.webp",
    "price": 279.9,
    "department": "tecnologia",
    "category": "ACESSÓRIOS"
  },
  {
    "productName": "Carregador Apple para iPhone",
    "descriptionShort": "Carregador Apple para iPhone. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-104.webp",
    "price": 129.9,
    "department": "tecnologia",
    "category": "ACESSÓRIOS"
  },
  {
    "productName": "Bateria Apple MagSafe",
    "descriptionShort": "Bateria Apple MagSafe. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-105.webp",
    "price": 699.9,
    "department": "tecnologia",
    "category": "ACESSÓRIOS"
  },
  {
    "productName": "Capa de silicone MagSafe para iPhone 12",
    "descriptionShort": "Capa de silicone MagSafe para iPhone 12. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-108.webp",
    "price": 199.9,
    "department": "tecnologia",
    "category": "ACESSÓRIOS"
  },
  {
    "productName": "iPad Mini 2021 Starlight",
    "descriptionShort": "iPad Mini 2021 Starlight. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-159.webp",
    "price": 3999.9,
    "department": "tecnologia",
    "category": "TABLETS"
  },
  {
    "productName": "Samsung Galaxy Tab S8 Plus",
    "descriptionShort": "Samsung Galaxy Tab S8 Plus. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-160.webp",
    "price": 5999.9,
    "department": "tecnologia",
    "category": "TABLETS"
  },
  {
    "productName": "Samsung Galaxy Tab branco",
    "descriptionShort": "Samsung Galaxy Tab branco. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-161.webp",
    "price": 2499.9,
    "department": "tecnologia",
    "category": "TABLETS"
  },
  {
    "productName": "MacBook Pro 14 polegadas",
    "descriptionShort": "MacBook Pro 14 polegadas. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-78.webp",
    "price": 15999.9,
    "department": "tecnologia",
    "category": "NOTEBOOKS"
  },
  {
    "productName": "Notebook Asus Zenbook Pro",
    "descriptionShort": "Notebook Asus Zenbook Pro. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-79.webp",
    "price": 8999.9,
    "department": "tecnologia",
    "category": "NOTEBOOKS"
  },
  {
    "productName": "Notebook Huawei Matebook X Pro",
    "descriptionShort": "Notebook Huawei Matebook X Pro. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-80.webp",
    "price": 7999.9,
    "department": "tecnologia",
    "category": "NOTEBOOKS"
  },
  {
    "productName": "Notebook Lenovo Yoga 920",
    "descriptionShort": "Notebook Lenovo Yoga 920. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-81.webp",
    "price": 5999.9,
    "department": "tecnologia",
    "category": "NOTEBOOKS"
  },
  {
    "productName": "Amazon Echo Plus",
    "descriptionShort": "Amazon Echo Plus. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-99.webp",
    "price": 499.9,
    "department": "tecnologia",
    "category": "ÁUDIO"
  },
  {
    "productName": "Apple AirPods",
    "descriptionShort": "Apple AirPods. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-100.webp",
    "price": 899.9,
    "department": "tecnologia",
    "category": "ÁUDIO"
  },
  {
    "productName": "Apple AirPods Max prata",
    "descriptionShort": "Apple AirPods Max prata. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-101.webp",
    "price": 3999.9,
    "department": "tecnologia",
    "category": "ÁUDIO"
  },
  {
    "productName": "Fone sem fio Beats Flex",
    "descriptionShort": "Fone sem fio Beats Flex. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-107.webp",
    "price": 399.9,
    "department": "tecnologia",
    "category": "ÁUDIO"
  },
  {
    "productName": "Apple Watch Series 4 dourado",
    "descriptionShort": "Apple Watch Series 4 dourado. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-106.webp",
    "price": 1299.9,
    "department": "tecnologia",
    "category": "RELÓGIOS"
  },
  {
    "productName": "Relógio com pulseira de couro",
    "descriptionShort": "Relógio com pulseira de couro. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-93.webp",
    "price": 149.9,
    "department": "tecnologia",
    "category": "RELÓGIOS"
  },
  {
    "productName": "Relógio Longines Master Collection",
    "descriptionShort": "Relógio Longines Master Collection. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-94.webp",
    "price": 1599.9,
    "department": "tecnologia",
    "category": "RELÓGIOS"
  },
  {
    "productName": "Relógio de pulso feminino",
    "descriptionShort": "Relógio de pulso feminino. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-194.webp",
    "price": 199.9,
    "department": "tecnologia",
    "category": "RELÓGIOS"
  },
  {
    "productName": "Maçãs",
    "descriptionShort": "Maçãs. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-16.webp",
    "price": 7.9,
    "department": "supermercado",
    "category": "ALIMENTOS"
  },
  {
    "productName": "Ovos",
    "descriptionShort": "Ovos. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-23.webp",
    "price": 14.9,
    "department": "supermercado",
    "category": "ALIMENTOS"
  },
  {
    "productName": "Arroz",
    "descriptionShort": "Arroz. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-38.webp",
    "price": 24.9,
    "department": "supermercado",
    "category": "ALIMENTOS"
  },
  {
    "productName": "Óleo de cozinha",
    "descriptionShort": "Óleo de cozinha. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-20.webp",
    "price": 8.9,
    "department": "supermercado",
    "category": "ALIMENTOS"
  },
  {
    "productName": "Suco de frutas",
    "descriptionShort": "Suco de frutas. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-29.webp",
    "price": 9.9,
    "department": "bebidas",
    "category": "BEBIDAS"
  },
  {
    "productName": "Café Nescafé",
    "descriptionShort": "Café Nescafé. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-34.webp",
    "price": 19.9,
    "department": "bebidas",
    "category": "BEBIDAS"
  },
  {
    "productName": "Refrigerante",
    "descriptionShort": "Refrigerante. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-39.webp",
    "price": 7.9,
    "department": "bebidas",
    "category": "BEBIDAS"
  },
  {
    "productName": "Água mineral",
    "descriptionShort": "Água mineral. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-42.webp",
    "price": 3.9,
    "department": "bebidas",
    "category": "BEBIDAS"
  },
  {
    "productName": "Sabonete líquido Attitude",
    "descriptionShort": "Sabonete líquido Attitude. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-118.webp",
    "price": 29.9,
    "department": "saude",
    "category": "CUIDADOS"
  },
  {
    "productName": "Sabonete corporal Olay",
    "descriptionShort": "Sabonete corporal Olay. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-119.webp",
    "price": 39.9,
    "department": "saude",
    "category": "CUIDADOS"
  },
  {
    "productName": "Loção corporal Vaseline",
    "descriptionShort": "Loção corporal Vaseline. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-120.webp",
    "price": 24.9,
    "department": "saude",
    "category": "CUIDADOS"
  },
  {
    "productName": "Esmalte vermelho",
    "descriptionShort": "Esmalte vermelho. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-5.webp",
    "price": 12.9,
    "department": "saude",
    "category": "CUIDADOS"
  },
  {
    "productName": "Bola de basquete",
    "descriptionShort": "Bola de basquete. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-140.webp",
    "price": 89.9,
    "department": "esportes",
    "category": "ESPORTES"
  },
  {
    "productName": "Bola de futebol",
    "descriptionShort": "Bola de futebol. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-147.webp",
    "price": 79.9,
    "department": "esportes",
    "category": "ESPORTES"
  },
  {
    "productName": "Raquete de tênis",
    "descriptionShort": "Raquete de tênis. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-152.webp",
    "price": 199.9,
    "department": "esportes",
    "category": "ESPORTES"
  },
  {
    "productName": "Bola de vôlei",
    "descriptionShort": "Bola de vôlei. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-153.webp",
    "price": 69.9,
    "department": "esportes",
    "category": "ESPORTES"
  },
  {
    "productName": "Camisa xadrez azul e preta",
    "descriptionShort": "Camisa xadrez azul e preta. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-83.webp",
    "price": 119.9,
    "department": "moda",
    "category": "ROUPAS"
  },
  {
    "productName": "Camisa xadrez masculina",
    "descriptionShort": "Camisa xadrez masculina. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-85.webp",
    "price": 109.9,
    "department": "moda",
    "category": "ROUPAS"
  },
  {
    "productName": "Camisa de manga curta",
    "descriptionShort": "Camisa de manga curta. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-86.webp",
    "price": 89.9,
    "department": "moda",
    "category": "ROUPAS"
  },
  {
    "productName": "Camisa masculina xadrez",
    "descriptionShort": "Camisa masculina xadrez. Produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/product-87.webp",
    "price": 99.9,
    "department": "moda",
    "category": "ROUPAS"
  },
  {
    "productName": "Televisor LED 32 polegadas",
    "descriptionShort": "Ilustração de televisor. Modelo e preço usados somente na demonstração do catálogo complementar.",
    "photo": "images/additional/tv-32.svg",
    "price": 1199.9,
    "department": "tecnologia",
    "category": "TVS"
  },
  {
    "productName": "Televisor LED 43 polegadas",
    "descriptionShort": "Ilustração de televisor. Modelo e preço usados somente na demonstração do catálogo complementar.",
    "photo": "images/additional/tv-43.svg",
    "price": 1899.9,
    "department": "tecnologia",
    "category": "TVS"
  },
  {
    "productName": "Televisor LED 50 polegadas",
    "descriptionShort": "Ilustração de televisor. Modelo e preço usados somente na demonstração do catálogo complementar.",
    "photo": "images/additional/tv-50.svg",
    "price": 2399.9,
    "department": "tecnologia",
    "category": "TVS"
  },
  {
    "productName": "Televisor LED 55 polegadas",
    "descriptionShort": "Ilustração de televisor. Modelo e preço usados somente na demonstração do catálogo complementar.",
    "photo": "images/additional/tv-55.svg",
    "price": 2899.9,
    "department": "tecnologia",
    "category": "TVS"
  },
  {
    "productName": "Dom Casmurro",
    "descriptionShort": "Capa ilustrativa criada para o catálogo complementar. Edição e preço demonstrativos.",
    "photo": "images/additional/dom-casmurro.svg",
    "price": 29.9,
    "department": "livros",
    "category": "LIVROS"
  },
  {
    "productName": "Memórias Póstumas de Brás Cubas",
    "descriptionShort": "Capa ilustrativa criada para o catálogo complementar. Edição e preço demonstrativos.",
    "photo": "images/additional/memorias-postumas.svg",
    "price": 34.9,
    "department": "livros",
    "category": "LIVROS"
  },
  {
    "productName": "O Cortiço",
    "descriptionShort": "Capa ilustrativa criada para o catálogo complementar. Edição e preço demonstrativos.",
    "photo": "images/additional/o-cortico.svg",
    "price": 24.9,
    "department": "livros",
    "category": "LIVROS"
  },
  {
    "productName": "Iracema",
    "descriptionShort": "Capa ilustrativa criada para o catálogo complementar. Edição e preço demonstrativos.",
    "photo": "images/additional/iracema.svg",
    "price": 27.9,
    "department": "livros",
    "category": "LIVROS"
  },
  {
    "productName": "Furadeira",
    "descriptionShort": "Furadeira. Foto ilustrativa; produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/furadeira.jpg",
    "price": 349.9,
    "department": "ferramentas",
    "category": "FERRAMENTAS"
  },
  {
    "productName": "Alicate universal",
    "descriptionShort": "Alicate universal. Foto ilustrativa; produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/alicate.jpg",
    "price": 39.9,
    "department": "ferramentas",
    "category": "FERRAMENTAS"
  },
  {
    "productName": "Trena",
    "descriptionShort": "Trena. Foto ilustrativa; produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/trena.jpg",
    "price": 24.9,
    "department": "ferramentas",
    "category": "FERRAMENTAS"
  },
  {
    "productName": "Martelo",
    "descriptionShort": "Martelo. Foto ilustrativa; produto e preço do catálogo complementar demonstrativo.",
    "photo": "images/additional/martelo.jpg",
    "price": 49.9,
    "department": "ferramentas",
    "category": "FERRAMENTAS"
  }
]

export const additionalProducts: Product[] = catalog.map<Product>(entry => ({
  ...identifyProduct(entry),
  department: entry.department,
  category: entry.category,
  source: 'additional',
  photo: import.meta.env.BASE_URL + entry.photo,
}))
