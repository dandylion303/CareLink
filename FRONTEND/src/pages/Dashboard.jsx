import ProtectedRoute from "../components/ProtectedRoute"

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className="m-5">
                <h1>Benvenuto su Care<em className="text-cl-primary">Link</em>!</h1>
            </div>
        </ProtectedRoute>
    )
}

export default Dashboard