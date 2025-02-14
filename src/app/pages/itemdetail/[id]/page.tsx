import ItemDetail from "@/components/ItemDetail";
// import { Param } from "@prisma/client/runtime/library";

export default function ItemDetailPage({ params }: { params: { id: string } }) {


    return <ItemDetail itemId={params.id} />;
} 