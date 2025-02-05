document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views  
  // document.querySelector('#dasboard').addEventListener('click', () => load_mailbox('dasboard'));
  document.querySelector('#category_view').addEventListener('click', () => toggle_views('category-view'));
  document.querySelector('#supplier').addEventListener('click', () => toggle_views('supplier-view'));
  document.querySelector('#item').addEventListener('click', () => toggle_views('item-view'));
  document.querySelector('#transaction').addEventListener('click', () => toggle_views('transaction-view'));
  document.querySelector('#add-category').addEventListener('click',  add_category);
  document.querySelector('#add-supplier').addEventListener('click',  add_supplier);
  document.querySelector('#add-item').addEventListener('click',  add_item);
  document.querySelector('#add-transaction').addEventListener('click',  add_transaction);

  document.querySelector('#category-form').addEventListener('submit', function(event) {
    event.preventDefault();
    add_category();
  });

  document.querySelector('#supplier-form').addEventListener('submit', function(event) {
    event.preventDefault();
    add_supplier();
  });

  document.querySelector('#item-form').addEventListener('submit', function(event) {
    event.preventDefault();
    add_item();
  });


  document.querySelector('#transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    add_transaction();
  });
  
});






function add_category() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#category-add').style.display = 'block';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'none';
  document.querySelector('#transaction-view').style.display = 'none';
  document.querySelector('#category-view').style.display = 'none';
  document.querySelector('#item-view').style.display = 'none';
  document.querySelector('#supplier-view').style.display = 'none';
  document.querySelector('#update-form-container').style.display = 'none';



  const name = document.querySelector('#category-name').value;
  const description = document.querySelector('#category-description').value;

  console.log(name)
  console.log(description)

  fetch('/api/categories/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
    body: JSON.stringify({ name: name, description: description })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add category');
    }
  })
  .then(data => {
    document.querySelector('#category-form').reset();
    load_categories();
  })
  .catch(error => console.error('Error:', error));
  }
  
  
  // Function to get CSRF token from cookies
  function getCSRFToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  




function add_item() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'block';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'none';
  document.querySelector('#transaction-view').style.display = 'none';
  document.querySelector('#category-view').style.display = 'none';
  document.querySelector('#item-view').style.display = 'none';
  document.querySelector('#supplier-view').style.display = 'none';
  document.querySelector('#update-form-container').style.display = 'none';



  const name = document.querySelector('#item-name').value;
  const category = document.querySelector('#item-category').value;
  const supplier = document.querySelector('#item-supplier').value;
  const quantity = document.querySelector('#item-quantity').value;
  const price_per_unit = document.querySelector('#item-price').value;



  fetch('/api/items/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
    body: JSON.stringify({ name: name, category: category , supplier:supplier , quantity:quantity , price_per_unit:price_per_unit })
  })
  
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add supplier');
    }
  })
  .then(data => {
    console.log("work")
    document.querySelector('#item-form').reset();
    console.log("load_siplicer")
    load_item();
  })
  .catch(error => console.error('Error:', error));
  


}

function add_transaction() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'block';
  document.querySelector('#category-list').style.display = 'none';
  document.querySelector('#transaction-view').style.display = 'none';
  document.querySelector('#category-view').style.display = 'none';
  document.querySelector('#item-view').style.display = 'none';
  document.querySelector('#supplier-view').style.display = 'none';
  document.querySelector('#update-form-container').style.display = 'none';



  const item = document.querySelector('#transaction-item').value;
  const type = document.querySelector('#transaction-type').value;
  const qty = document.querySelector('#transaction-quantity').value;
  const notes = document.querySelector('#transaction-notes').value;

  
  console.log(item)
  console.log(type)
  console.log(qty)
  console.log(notes)
  

  fetch('/api/inventory-transactions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
    body: JSON.stringify({ item: item, transaction_type: type , quantity:qty , notes:notes })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add supplier');
    }
  })
  .then(data => {
    document.querySelector('#transaction-form').reset();
    console.log("load_siplicer")
    // load_supplier();
  })
  .catch(error => console.error('Error:', error));
  

}




function add_supplier() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'block';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'none';
  document.querySelector('#transaction-view').style.display = 'none';
  document.querySelector('#category-view').style.display = 'none';
  document.querySelector('#item-view').style.display = 'none';
  document.querySelector('#supplier-view').style.display = 'none';
  document.querySelector('#update-form-container').style.display = 'none';

  const name =  document.querySelector('#supplier-name').value ; 
  const contact_name =  document.querySelector('#supplier-contact-name').value ;
  const phone = document.querySelector('#supplier-phone').value ; 
  const email =  document.querySelector('#supplier-email').value ;
  const address =  document.querySelector('#supplier-address').value ;



  fetch('/api/suppliers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
    body: JSON.stringify({ name: name, contact_name: contact_name , phone:phone , email:email , address:address })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add supplier');
    }
  })
  .then(data => {
    document.querySelector('#supplier-form').reset();
    console.log("load_siplicer")
    load_supplier();
  })
  .catch(error => console.error('Error:', error));
  }




function load_categories() {
  // Show category view and hide other views
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'block';
  document.querySelector('#update-form-container').style.display = 'none';



  // Fetch categories from the API
  fetch('/api/categories/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Display categories in the console

    

    // Display categories in the UI
    const categoryView = document.querySelector('#category-list');
    categoryView.innerHTML = '<h3>Categories</h3>';
    data.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.classList.add('category-item');
  
      const categoryName = document.createElement('h4');
      categoryName.classList.add('category-name');
      categoryName.textContent = `Name: ${category.name}`;
  
      const categoryDescription = document.createElement('p');
      categoryDescription.classList.add('category-description');
      categoryDescription.textContent = `Description: ${category.description}` || 'No description available';

       // Create Update Button
       const updateButton = document.createElement('button');
       updateButton.classList.add('update-btn');
       updateButton.textContent = 'Update';
       updateButton.onclick = function() {
        openUpdateForm(category)
         console.log(`Update category: ${category.id}`);
         // You can trigger an update form, modal, or redirect to an update page.
       };

       const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        fetch(`http://127.0.0.1:8000/api/categories/${category.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
    
          },
        }) .then(response => {
          if (response.ok) {
            // If the response is OK, reload categories
            load_categories();
          } else {
            // Handle error response if needed
            console.error('Failed to delete category');
          }
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
      };
        
      
   
  
      // Append the name and description to the category item
      categoryItem.appendChild(categoryName);
      categoryItem.appendChild(categoryDescription);
      categoryItem.appendChild(updateButton);
      categoryItem.appendChild(deleteButton);
      
  
      // Add the category item to the category view
      categoryView.appendChild(categoryItem);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
}


function load_supplier() {
  // Show category view and hide other views
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'block';
  document.querySelector('#update-form-container').style.display = 'none';


  // Fetch categories from the API
  fetch('/api/suppliers/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Display categories in the console

    // Display categories in the UI
    const categoryView = document.querySelector('#category-list');
    categoryView.innerHTML = '<h3>Supplier</h3>';
    data.forEach(supplier => {
      const categoryItem = document.createElement('div');
      categoryItem.classList.add('category-item');
  
      const supplierName = document.createElement('h2');
      supplierName.classList.add('supplier-name');
      supplierName.textContent = ` name: ${supplier.name}`;

      const supplierPhone = document.createElement('h6');
      supplierPhone.classList.add('supplier-phone');
      supplierPhone.textContent = `Phone: ${supplier.phone}` || 'No description available';

      const supplierEmail = document.createElement('h6');
      supplierEmail.classList.add('supplier-email');
      supplierEmail.textContent = `email: ${supplier.email}`;

      const supplierContact_Name = document.createElement('h6');
      supplierContact_Name.classList.add('supplier-contact_name');
      supplierContact_Name.textContent = `contact_name: ${supplier.contact_name}`;

      const supplierAddress = document.createElement('p');
      supplierAddress.classList.add('supplier-address');
      supplierAddress.textContent = `address: ${supplier.address}`;

      // Create Update Button
      const updateButton = document.createElement('button');
      updateButton.classList.add('update-btn');
      updateButton.textContent = 'Update';
      updateButton.onclick = function() {
        openUpdateFormSupplier(supplier); // Call a function to open the update form
      };

      // Create Delete Button
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        deleteSupplier(supplier.id);  // Call a function to delete the supplier
      };

      // Append the name and description to the category item
      categoryItem.appendChild(supplierName);
      categoryItem.appendChild(supplierContact_Name);
      categoryItem.appendChild(supplierPhone);
      categoryItem.appendChild(supplierEmail);
      categoryItem.appendChild(supplierAddress);
      categoryItem.appendChild(updateButton);
      categoryItem.appendChild(deleteButton);
  
      // Add the category item to the category view
      categoryView.appendChild(categoryItem);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
}


function load_item() {
  // Show category view and hide other views
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'block';
  document.querySelector('#update-form-container').style.display = 'none';



  // Fetch categories from the API
  fetch('/api/items/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Display categories in the console

    // Display categories in the UI
    const categoryView = document.querySelector('#category-list');
    categoryView.innerHTML = '<h3>Item New</h3>';

    data.forEach(item => {
      const categoryItem = document.createElement('div');
      categoryItem.classList.add('category-item');
  
      const itemName = document.createElement('h2');
      itemName.classList.add('item-name');
      itemName.textContent = `Item Name: ${item.name}`;
  
      const categoryName = document.createElement('h4');
      categoryName.classList.add('category-description');
      categoryName.textContent = `Category: ${item.category_name}` || 'No description available';

      

      const supplierName = document.createElement('h4');
      supplierName.classList.add('category-description');
      supplierName.textContent = `Supplier: ${item.supplier_name}`;

      const quantity = document.createElement('h4');
      quantity.classList.add('category-description');
      quantity.textContent = ` Qty: ${item.quantity}`;
  
      const price_per_unit = document.createElement('h4');
      price_per_unit.classList.add('category-description');
      price_per_unit.textContent = ` price : ${item.price_per_unit}`;
  
  
  
      // Append the name and description to the category item
      categoryItem.appendChild(itemName);
      categoryItem.appendChild(categoryName);
      categoryItem.appendChild(supplierName);
      categoryItem.appendChild(quantity);
      categoryItem.appendChild(price_per_unit);


  
      // Add the category item to the category view
      categoryView.appendChild(categoryItem);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
}


function load_transaction() {
  // Show category view and hide other views
  document.querySelector('#category-add').style.display = 'none';
  document.querySelector('#supplier-add').style.display = 'none';
  document.querySelector('#item-add').style.display = 'none';
  document.querySelector('#transaction-add').style.display = 'none';
  document.querySelector('#category-list').style.display = 'block';
  document.querySelector('#update-form-container').style.display = 'none';





  // Fetch categories from the API
  fetch('/api/inventory-transactions/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Display categories in the console

    // Display categories in the UI
    const categoryView = document.querySelector('#category-list');
    categoryView.innerHTML = '<h3>Transaction</h3>';
    data.forEach(transaction => {
      const categoryItem = document.createElement('div');
      categoryItem.classList.add('category-item');
  
      const categoryName = document.createElement('h4');
      categoryName.classList.add('category-name');
      categoryName.textContent = `Tranaction: ${transaction.item_name}`;
  
      const categoryDescription = document.createElement('p');
      categoryDescription.classList.add('category-description');
      categoryDescription.textContent = `Status: ${transaction.transaction_type}` || 'No description available';

      const categoryType = document.createElement('p');
      categoryType.classList.add('category-description');
      categoryType.textContent = `Status: ${transaction.transaction_type}` || 'No description available';

      const categoryQty = document.createElement('p');
      categoryQty.classList.add('category-description');
      categoryQty.textContent = `Status: ${transaction.quantity}` || 'No description available';

      const categoryDate = document.createElement('p');
      categoryDate.classList.add('category-description');
      categoryDate.textContent = `Date: ${transaction.date}` || 'No description available';

      const categoryNote = document.createElement('p');
      categoryNote.classList.add('category-description');
      categoryNote.textContent = `Note: ${transaction.notes}` || 'No description available';


     
  
      // Append the name and description to the category item
      categoryItem.appendChild(categoryName);
      categoryItem.appendChild(categoryDescription);
      categoryItem.appendChild(categoryQty);
      categoryItem.appendChild(categoryDate);
      categoryItem.appendChild(categoryNote);
  
      // Add the category item to the category view
      categoryView.appendChild(categoryItem);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
}


function toggle_views(viewToShow) {
  console.log(viewToShow)
  const views = ['#emails-view', '#category-view', '#supplier-view', '#item-view', '#transaction-view', '#category-list'];
  views.forEach(view => {
    document.querySelector(view).style.display = (view === viewToShow) ? 'block' : 'none';
  });
  if (viewToShow === 'category-view'){
    load_categories()
  }else if(viewToShow === 'supplier-view'){
    load_supplier()
  }else if(viewToShow === 'item-view'){
    load_item()
  }else if(viewToShow === 'transaction-view'){
    load_transaction()
  }
}



// Function to open the update form and pre-fill it
function openUpdateForm(category) {
  // Show the update form
  document.querySelector('#update-form-container').style.display = 'block';
  document.querySelector('#category-list').style.display = 'none';
  document.querySelector('#transaction-view').style.display = 'none';
  document.querySelector('#category-view').style.display = 'none';
  document.querySelector('#item-view').style.display = 'none';
  document.querySelector('#supplier-view').style.display = 'none';

  
  // Fill the form with the category's data
  document.querySelector('#category-name').value = category.name;
  document.querySelector('#category-description').value = category.description || '';

  // Handle form submission
  const form = document.querySelector('#update-category-form');
  form.onsubmit = function(event) {
    event.preventDefault();
    
    // Prepare the data to be updated
    const updatedData = {
      name: document.querySelector('#category-name-update').value,
      description: document.querySelector('#h').value,
    };

    console.log(updatedData)

    // Send the PUT request to update the category
    fetch(`http://127.0.0.1:8000/api/categories/${category.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),

      },
      body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(updatedCategory => {
      console.log('Category updated:', updatedCategory);
      closeUpdateForm();  // Close the form after update
      load_categories();  // Reload the categories list to reflect the changes
    })
    .catch(error => {
      console.error('Error updating category:', error);
    });
  };
}



// Function to close the update form
function closeUpdateForm() {
  document.querySelector('#update-form-container').style.display = 'none';
  document.querySelector('#update-form-supplier').style.display = 'none';


  // Reset all form fields to empty
  document.querySelector('#category-name-update').value = '';
  document.querySelector('#h').value = '';
  document.getElementById('supplier-name-update').value= '';
  document.getElementById('supplier-contact-name-update').value= '';
  document.getElementById('supplier-phone-update').value= '';
  document.getElementById('supplier-email-update').value= '';
  document.getElementById('supplier-address-update').value= '';
}


// Function to open the update form and pre-fill it

function openUpdateFormSupplier(category) {
  // Show the update form
  document.querySelector('#update-form-supplier').style.display = 'block';
  document.querySelector('#update-form-container').style.display = 'none';
  document.querySelector('#category-list').style.display = 'none';
  document.querySelector('#transaction-view').style.display = 'none';
  document.querySelector('#category-view').style.display = 'none';
  document.querySelector('#item-view').style.display = 'none';
  document.querySelector('#supplier-view').style.display = 'none';

  
  // Fill the form with the category's data
  document.querySelector('#category-name').value = category.name;
  document.querySelector('#category-description').value = category.description || '';

  // Handle form submission
  const form = document.querySelector('#update-supplier-form');
  form.onsubmit = function(event) {
    event.preventDefault();
    
    // Prepare the data to be updated
    const supplierData = {
      name: document.getElementById('supplier-name-update').value,
      contact_name: document.getElementById('supplier-contact-name-update').value,
      phone: document.getElementById('supplier-phone-update').value,
      email: document.getElementById('supplier-email-update').value,
      address: document.getElementById('supplier-address-update').value
  };

    console.log(supplierData)

    // Send the PUT request to update the category
    fetch(`http://127.0.0.1:8000/api/suppliers/${category.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),

      },
      body: JSON.stringify(supplierData),
    })
    .then(response => response.json())
    .then(updatedCategory => {
      console.log('Category updated:', updatedCategory);
      closeUpdateForm();  
      load_supplier();  
    })
    .catch(error => {
      console.error('Error updating category:', error);
    });
  };
}
