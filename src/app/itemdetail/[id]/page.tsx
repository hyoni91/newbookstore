import ItemDetail from "@/components/ItemDetail";

interface Params {
    id: string;
}


export default  function ItemDetailPage({ params }: { params: Params }) {

    console.log(params.id);

    return <ItemDetail itemId={params.id} />;
} 