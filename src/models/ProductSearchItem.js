export default function(args) {
  //this.link = `/search/exact/brand_id/${ args.brand_id }/string/${ args.search_string }`
  this.brand_id = args.brand_id
  this.search_string = args.search_string
  this.short_name = `${ args.brand } - ${ args.number } - ${ args.spec_name }`
}
