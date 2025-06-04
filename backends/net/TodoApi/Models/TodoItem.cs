using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;

public class TodoItem
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Text { get; set; } = string.Empty;
} 