const isProduction = process.env.NODE_ENV === 'production';

const authConfig = {
    secret: isProduction ? (process.env.JWT_SECRET as string) : "e95d30b3f15ae85b730ea6dda6aec9e5"
}

export default authConfig;