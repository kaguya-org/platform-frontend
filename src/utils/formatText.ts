export function parseToSlugLowerCase(string?: string, slug?: string) {
  if(string) {
    return string.replace(/\s/g, slug || '-').toLowerCase();
  }

  return string;
}

export function modifyYoutubeUrl(string?: string, replace_to?: string, replace_from?: string) {
  if(string) {
    return string.replace('watch?v=' || replace_to, 'embed/' || replace_from);
  }

  return string;
}

