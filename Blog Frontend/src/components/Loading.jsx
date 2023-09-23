import PropagateLoader from "react-spinners/ClipLoader";

function Loading(props){
    return <PropagateLoader
            color={"skyblue"}
            loading={props.loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            className='loader'
            />
}

export default Loading;