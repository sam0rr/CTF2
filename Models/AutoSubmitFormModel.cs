namespace CTFomni.Models;

public class AutoSubmitFormModel
{
    public required string ActionUrl { get; set; }
    public required Dictionary<string, string> FormData { get; set; }
}