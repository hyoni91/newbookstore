import ItemDetail from "@/components/ItemDetail";

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
   const resolvedPrams = await params;


    return <ItemDetail itemId={resolvedPrams.id} />;
} 