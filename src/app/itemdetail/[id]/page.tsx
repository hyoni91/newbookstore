import ItemDetail from "@/components/ItemDetail";

type Params =  Promise<{id: string}>



export default async function ItemDetailPage({ params }: { params: Params }) {
    const { id } = await params;
    console.log(id)


    return <ItemDetail itemId={id} />;
} 