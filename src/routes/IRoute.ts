interface IRoute {
  index?: boolean
  path?: string
  element: JSX.Element,
  children?: IRoute[]
}

export default IRoute