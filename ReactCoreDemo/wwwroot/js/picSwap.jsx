class AnimalPicSwap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageAltText: 'Kitty',
            imageSrc: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg'
        };

        this.handleSwapPicImageClick = this.handleSwapPicImageClick.bind(this);
    }

    handleSwapPicImageClick() {
        const altText = this.state.imageAltText;

        const catImage = 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg';
        const dogImage = 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-puppy.jpeg';

        if (altText == 'Kitty') {
            this.setState({
                imageAltText: 'Doggy',
                imageSrc: dogImage
            });
        } else {
            this.setState({
                imageAltText: 'Kitty',
                imageSrc: catImage
            });
        }
    }
    
    render() {
        return (
            <div>
                <h2>Click the picture to swap it!</h2>

                <img
                    style={{ width: '400px', height: 'auto' }}
                    src={this.state.imageSrc}
                    alt={this.state.imageAltText}
                    onClick={this.handleSwapPicImageClick} />
            </div>    
        );
    }
}

ReactDOM.render(
    <AnimalPicSwap />, document.getElementById('content')
);