import PageContent from "~/components/page-content";
import PickCustomerDialog from "~/components/pick-customer-dialog";
import PickRestaurantDialog from "~/components/pick-restaurant-dialog";

export default function NewOrderPage() {
    return <form action="">
        <PageContent
            title="New order"
            floatingActionButton={<OrderSummary />}
        >
            <div className="grid md:grid-cols-2 gap-5">
                <PickCustomerDialog name="customerId" />
                <PickRestaurantDialog name="restaurantId" />
            </div>
            <div className="h-[50px]" />
        </PageContent>
    </form>
}


function OrderSummary() {


    return <div className="w-[100vw] h-[50px] sm:w-[350px] sm:m-3 sm:rounded-md bg-secondary text-white flex justify-between">
        <div className="px-5 py-2">
            <p className="text-sm">5, items</p>
            <p className="text-xs">Total: $ 37,21</p>
        </div>
        <div>
            <button className="h-[50px] px-5 hover:bg-black hover:bg-opacity-20">Continue</button>
        </div>
    </div>
}