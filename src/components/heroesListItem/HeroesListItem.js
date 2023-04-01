

const HeroesListItem = ({name, description, element, deleteHero}) => {


    let elementClassName;

    switch (element) {
        case 'Fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'Water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'Wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'Earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    
    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BL0b0jjI1tLEjt2U4OBqi7mJdhmYD7YdyA&usqp=CAU" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover', 'height': '150px'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" 
                        className="btn-close btn-close" 
                        aria-label="Close"
                        onClick={(deleteHero)}>       
                </button>
            </span>
        </li>
    )
}

export default HeroesListItem;