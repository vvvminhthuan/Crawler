import Layout from 'components/Layouts'
import Overview from 'components/Widgets/Overview'
import TableWidgets from 'components/Widgets/TableWidgets'
const HomePage = () => {
    const rowShow = (e) =>{
        console.log('rowEdit ',e)
    }
    const rowUpdate = (e) =>{
        console.log('rowUpdate ', e)
    }
    const rowDelete = (e) =>{
        console.log('rowDelete ', e)
    }

    let init={
        title: 'Earnings By Items',
        description: 'Day la mot doan mo ta ve bang du lieu',
        columns: [
            {
                name: 'Date',
                key: 'date'
            },
            {
                name: 'Order ID',
                key: 'id'
            },
            {
                name: 'Name', 
                key: 'name'
            },
            {
                name: 'Price',
                key: 'price'
            },
            {
                name: 'Quantity', 
                key: 'quantity'
            },
            {
                name: 'Total',
                key: 'amount'
            }
        ],
        data: [
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            },
            {
                date:' 2018-09-29 05:57',
                id:	'100398',
                name: 'iPhone X 64Gb Grey',
                price: '$999.00',
                quantity:	1,
                amount: '$999.00'
            }
        ]
    }
    let option = {
        hasFilter: true,
        hasPagination: true,
        pagSize: 12,
        rowEdit: {
            show: rowShow,
            update: rowUpdate,
            delete: rowDelete
        }
    }
    return (
        <Layout title='Trang Chủ' description='Hoàng Minh Thuận'> 
			<div className='widgets-overview flex-r flex-w'>
                <Overview 
                    title={11525} 
                    description='members online'
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className='title-icon' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>}
                >
                    <div>chart con o day</div>
                </Overview>
                <Overview 
                    title={23} 
                    description='quantity sales'
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='title-icon' viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                    </svg>}
                >
                    <div>chart con o day</div>
                </Overview>
                <Overview 
                    title={2323} 
                    description='task list'
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='title-icon' viewBox="0 0 16 16">
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>}
                >
                    <div>chart con o day</div>
                </Overview>
                <Overview 
                    title={12323} 
                    description='total earnings'
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='title-icon' viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>}
                >
                    <div>chart con o day</div>
                </Overview>
            </div>
            <div className="flex-r">
                <TableWidgets init={init} option={option}/>
            </div>
		</Layout>
    )
}
  
export default HomePage