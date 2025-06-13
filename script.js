document.addEventListener('DOMContentLoaded',()=>{
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const productCardsContainer = document.getElementById('productCardsContainer');
    const noCardsMessage = document.getElementById('noCardsMessage');

    const errorProductName = document.getElementById('errorProductName');
    const errorProductDescription = document.getElementById('errorProductDescription');
    const errorProductPrice = document.getElementById('errorProductPrice');
    const errorProductImage = document.getElementById('errorProductImage');

    //Funcion auxiliar para mostrar errores

    function mostrarError(elementoError,inputElement, mensaje){
        elementoError.textContent = mensaje;
        elementoError.style.display ='block';
        inputElement.classList.add('invalid');
    }

    //Funcion auxiliar para ocultar el error
    function ocultarError(elementoError, inputElement){
        elementoError.style.display = 'none';
        inputElement.classList.remove('invalid');
    }

    // Validar en tiempo real

    productNameInput.addEventListener('input',()=>{
        if(productNameInput.value.trim() === ''){
            mostrarError(errorProductName,productNameInput,'El nombre del producto es requerido');
        }else{
            ocultarError(errorProductName,productNameInput);
        }
    });
    productDescriptionInput.addEventListener('input',()=>{
        if(productDescriptionInput.value.trim() === ''){
            mostrarError(errorProductDescription,productDescriptionInput,'La descripcion es requerida');
        }else{
            ocultarError(errorProductDescription,productDescriptionInput);
        }
    });

    productPriceInput.addEventListener('input',()=>{
        const price =parseFloat(productPriceInput.value);
        if (isNaN(price) || price <= 0){
            mostrarError(errorProductPrice,productPriceInput,'El precio debe de ser un numero positivo y mayor que 0.');
        }else{
            ocultarError(errorProductPrice,productPriceInput);
        }
    });

    productImageInput.addEventListener('input',()=>{
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if(!urlRegex.test(productImageInput.value) || productImageInput.value.trim() === ''){
            mostrarError(errorProductImage,productImageInput,'El URL de la imagen es invalida o requerida');
        }else{
            ocultarError(errorProductImage,productImageInput);
        }
    });

    // Manejar el envio del formulario
    productForm.addEventListener('submit',(event)=>{
        event.preventDefault();

        let formValido = true;
        if(productNameInput.value.trim() === ''){
            mostrarError(errorProductName,productNameInput,'El nombre del producto es requerido');
        }else{
            ocultarError(errorProductName,productNameInput);
        }
        if(productDescriptionInput.value.trim() === ''){
            mostrarError(errorProductDescription,productDescriptionInput,'La descripcion es requerida');
        }else{
            ocultarError(errorProductDescription,productDescriptionInput);
        }
        const price =parseFloat(productPriceInput.value);
        if (isNaN(price) || price <= 0){
            mostrarError(errorProductPrice,productPriceInput,'El precio debe de ser un numero positivo y mayor que 0.');
        }else{
            ocultarError(errorProductPrice,productPriceInput);
        }
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if(!urlRegex.test(productImageInput.value) || productImageInput.value.trim() === ''){
            mostrarError(errorProductImage,productImageInput,'El URL de la imagen es invalida o requerida');
        }else{
            ocultarError(errorProductImage,productImageInput);
        }

        if(formValido){
            noCardsMessage.style.display = 'none';//oculta el mensaje de no hay tarjetas

            // Crear los elementos en la tarjeta dinamicamente
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImage = document.createElement('img');
            productImage.src = productImageInput.value;
            productImage.alt = productNameInput.value;
            productImage.onerror = function(){
                this.src = 'https://via.placeholder.com/200x150?text=No+Image'
            };

            const cardContent = document.createElement('div');
            cardContent.classList.add('product-card-content');

            const productName = document.createElement('h3');
            productName.textContent = productNameInput.value;

            const productDescription = document.createElement('p');
            productDescription.textContent = productDescriptionInput.value;

            const productPrice = document.createElement('p');
            productPrice.classList.add('price');
            productPrice.textContent = `$${price.toFixed(2)}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Eliminar";
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click',()=>{
                productCard.remove(); //Elimina la carta del DOM

                if(productCardsContainer.children.length === 0){
                    noCardsMessage.style.display = 'block';
                }
            });
            //Agregar los elementos al DOM

            cardContent.appendChild(productName);
            cardContent.appendChild(productDescription);
            cardContent.appendChild(productPrice);
            cardContent.appendChild(deleteButton);

            productCard.appendChild(productImage);
            productCard.appendChild(cardContent);

            //Añadir una carta nueva se vaya de primera
            productCardsContainer.prepend(productCard);


            //Limpiar el formulario
            productForm.reset();

            // Limpiar los estilos de error

            ocultarError(errorProductName,productNameInput);
            ocultarError(errorProductDescription,productDescriptionInput);
            ocultarError(errorProductPrice, productPriceInput);
            ocultarError(errorProductImage, productImageInput);
        }
    });
});