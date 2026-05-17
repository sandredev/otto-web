import Table from "@/shared/Table/Table";
import { faCog } from '@fortawesome/free-solid-svg-icons';


export default function GeneralSales() {
    return (
        <div>
            <div>
                <h1>Historial de ventas historico</h1>
            </div>
            <div>
                <Table rowData={[]} />
            </div>
        </div>
    )
}