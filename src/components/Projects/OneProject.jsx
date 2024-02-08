import '../App/App.css'
function OneProject({ project }) {
    return (
        <>
            <h1>One Project</h1>
            <div>
                <h2>{project.title}</h2>
                <p>Brand: {project.brand}</p>
                <p>Category: {project.category}</p>
                <p>Description: {project.description}</p>
                <p>Discount Percentage: {project.discountPercentage}</p>
                <p>Price: {project.price}</p>
                <p>Rating: {project.rating}</p>
                <p>Stock: {project.stock}</p>
                <img src={project.thumbnail} alt="Thumbnail" />
            </div>
        </>
    )
}

export default OneProject;