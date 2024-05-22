export function sortCustomers(key, customers, sortOrders) {
    if (sortOrders[key] === 'asc') {
      sortOrders[key] = 'desc'
    } else {
      sortOrders[key] = 'asc'
    }
  
    customers.sort((a, b) => {
      let aValue, bValue
      switch (key) {
        case 'first_name':
          aValue = a.contact_persons[0].first_name
          bValue = b.contact_persons[0].first_name
          break
        case 'last_name':
          aValue = a.contact_persons[0].last_name
          bValue = b.contact_persons[0].last_name
          break
        case 'company_name':
          aValue = a.addresses[0].company_name
          bValue = b.addresses[0].company_name
          break
        case 'country':
          aValue = a.addresses[0].country
          bValue = b.addresses[0].country
          break
        case 'zip':
          aValue = a.addresses[0].zip
          bValue = b.addresses[0].zip
          break
        case 'street':
          aValue = a.addresses[0].street
          bValue = b.addresses[0].street
          break
        default:
          aValue = a[key]
          bValue = b[key]
      }
      const order = sortOrders[key]
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }