import ItemDetail from "@/components/ItemDetail";

export default  function ItemDetailPage({ params }: { params: { id: string } }) {

    console.log(params.id);

    return <ItemDetail itemId={params.id} />;
} 