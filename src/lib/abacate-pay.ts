import axios from "axios";

const api = axios.create({
  baseURL: "https://api.abacatepay.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.ABACATE_PAY_SECRET}`,
  },
});

type CreateCheckoutUrlPayload = {
  product: {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    quantity?: number;
  };
  customer: {
    name: string;
    cellphone?: string;
    email: string;
  };
};

const createCheckoutUrl = async ({
  product,
  customer,
}: CreateCheckoutUrlPayload) => {
  const { data } = await api.post("/billing/create", {
    frequency: "ONE_TIME",
    methods: ["PIX"],
    products: [
      {
        externalId: product.id,
        name: product.name,
        description: product.description,
        quantity: product?.quantity ?? 1,
        price: product.price,
      },
    ],
    customer,
    returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    completionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?courseId=${product.id}`,
  });

  return data.data.url as string;
};

export const AbacatePayApi = {
  createCheckoutUrl,
};
