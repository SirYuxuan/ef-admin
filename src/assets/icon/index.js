const req = require.context('./res', false, /\.svg$/),
  requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
  }
requireAll(req)
