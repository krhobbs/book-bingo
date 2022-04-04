import styles from './item-front.module.scss';

function ItemFront(props) {

    return (
        <div>
            {props.bookReq}
        </div>
    );
}

export default ItemFront;