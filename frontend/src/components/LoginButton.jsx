import { Button } from "@/components/ui/button";

const LoginButton = ({label, className}) => {
  return (
    <Button variant="default" className={className}>
        {label}
    </Button>
  )
}

export default LoginButton