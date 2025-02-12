import ItemDetail from "@/components/ItemDetail";

export default function ItemDetailPage({ params }: { params: { id: string } }) {


    return <ItemDetail itemId={params.id} />;
} 