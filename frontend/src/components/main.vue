<template>
    <main class="main">
      <section class="section">
        <h2>Customers</h2>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Example label</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </template>
  
<style scoped> 
.main { 
    background-color: #2966e8a4; 
    width: 80vw; 
    height: 100vh; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
} 
.section{ 
    background-color: aliceblue; 
    min-height: 80vh; 
    width: 100%; 
    padding: 1vh 2vw;
    display: flex;
    flex-direction: column;
} 
</style>
