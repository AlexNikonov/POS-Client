export default function(args) {
  this.link = `/search/exact/brand_id/${ args.brand_id }/string/${ args.search_string }`
  this.short_name = `${ args.brand } - ${ args.number } - ${ args.name }`
}
